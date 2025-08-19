import mysql from "mysql2/promise";
import { connectDB } from "../../lib/db";

function toMySQLDate(dateStr) {
  // const [day, month, year] = dateStr.split("-");
  // return `${year}-${month}-${day}`; 
  return dateStr;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { batchNo, status, mode, startDate, endDate, sections } = body;
    const connection = await connectDB();

    // Convert main batch dates
    const mysqlStartDate = toMySQLDate(startDate);
    const mysqlEndDate = toMySQLDate(endDate);

    // 1️⃣ Insert into batches table
    const [batchResult] = await connection.execute(
      `INSERT INTO batches (batchNo, status, mode, startDate, endDate)
       VALUES (?, ?, ?, ?, ?)`,
      [batchNo, status, mode, mysqlStartDate, mysqlEndDate]
    );

    const batchId = batchResult.insertId;

    // 2️⃣ Prepare section insert values (convert dates too)
    const sectionValues = Object.entries(sections).map(([name, dates]) => [
      batchId,
      name,
      toMySQLDate(dates.startDate),
      toMySQLDate(dates.endDate)
    ]);

    await connection.query(
      `INSERT INTO batch_sections (batch_id, section_name, startDate, endDate)
       VALUES ?`,
      [sectionValues]
    );

    return new Response(JSON.stringify({ success: true, batchId }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("searchTerm") || "";
    const mode = searchParams.get("mode") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    // let sql = `
    //   SELECT b.*, 
    //     JSON_OBJECTAGG(s.section_name, JSON_OBJECT('startDate', s.startDate, 'endDate', s.endDate)) AS sections
    //   FROM batches b
    //   LEFT JOIN batch_sections s ON b.id = s.batch_id
    //   WHERE 1 = 1
    // `;
    let sql = `
    SELECT b.*, 
      JSON_OBJECTAGG(
        COALESCE(s.section_name, 'Unknown'), 
        JSON_OBJECT('startDate', s.startDate, 'endDate', s.endDate)
      ) AS sections
    FROM batches b
    LEFT JOIN batch_sections s ON b.id = s.batch_id`;
    const params = [];

    // Batch No filter
    if (searchTerm) {
      sql += " AND b.batchNo LIKE ?";
      params.push(`%${searchTerm}%`);
    }

    // Mode filter
    if (mode && mode !== "Off") {
      sql += " AND b.mode = ?";
      params.push(mode);
    }

    // Date range filter (section dates)
    if (startDate && endDate) {
      sql += ` AND EXISTS (
        SELECT 1 FROM batch_sections s2 
        WHERE s2.batch_id = b.id 
          AND s2.startDate <= ? 
          AND s2.endDate >= ?
      )`;
      params.push(endDate, startDate);
    } else if (startDate) {
      sql += ` AND EXISTS (
        SELECT 1 FROM batch_sections s2 
        WHERE s2.batch_id = b.id 
          AND s2.endDate >= ?
      )`;
      params.push(startDate);
    } else if (endDate) {
      sql += ` AND EXISTS (
        SELECT 1 FROM batch_sections s2 
        WHERE s2.batch_id = b.id 
          AND s2.startDate <= ?
      )`;
      params.push(endDate);
    }

    sql += " GROUP BY b.id";
    const connection = await connectDB();
    const [rows] = await connection.query(sql, params);

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}