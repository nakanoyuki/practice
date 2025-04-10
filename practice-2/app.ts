type Attendance = {
  employeeId: string;
  name: string;
  date: string; // YYYY-MM-DD形式
  checkIn: string; // HH:mm形式
  checkOut: string; // HH:mm形式
};

async function fetchAttendance(): Promise<Attendance[]> {
  return [
    {
      employeeId: "E001",
      name: "田中",
      date: "2024-04-01",
      checkIn: "09:00",
      checkOut: "18:00",
    },
    {
      employeeId: "E001",
      name: "田中",
      date: "2024-04-02",
      checkIn: "09:15",
      checkOut: "18:45",
    },
    {
      employeeId: "E002",
      name: "佐藤",
      date: "2024-04-01",
      checkIn: "08:45",
      checkOut: "17:15",
    },
    {
      employeeId: "E002",
      name: "佐藤",
      date: "2024-04-02",
      checkIn: "09:00",
      checkOut: "17:00",
    },
  ];
}
function getWorkingHours(checkIn: string, checkOut: string) {
  const [inHour, inMin] = checkIn.split(":").map(Number);
  const [outHour, outMin] = checkOut.split(":").map(Number);

  const inMinutes = inHour * 60 + inMin;
  const outMinutes = outHour * 60 + outMin;

  return (outMinutes - inMinutes) / 60;
}

async function main() {
  const data = await fetchAttendance();

  // 社員ごとの日別勤務時間を保存
  const employeeRecords: {
    [id: string]: {
      name: string;
      records: { date: string; hours: number }[];
    };
  } = {};

  // 同時に、平均勤務時間を出すための合計＆回数カウント
  const employeeStats: {
    [id: string]: {
      name: string;
      totalHours: number;
      count: number;
    };
  } = {};

  for (const record of data) {
    const id = record.employeeId;
    const hours = getWorkingHours(record.checkIn, record.checkOut);

    // 問題1のための記録
    if (!employeeRecords[id]) {
      employeeRecords[id] = { name: record.name, records: [] };
    }
    employeeRecords[id].records.push({ date: record.date, hours });

    // 問題2のための集計
    if (!employeeStats[id]) {
      employeeStats[id] = { name: record.name, totalHours: 0, count: 0 };
    }
    employeeStats[id].totalHours += hours;
    employeeStats[id].count += 1;
  }

  // === 問題1: 各社員の日別勤務時間 ===
  console.log("=== 問題1: 日別勤務時間 ===");
  for (const id in employeeRecords) {
    const { name, records } = employeeRecords[id];
    for (const r of records) {
      console.log(`${name}: ${r.date} -> ${r.hours.toFixed(2)}時間`);
    }
  }

  // === 問題2: 各社員の平均勤務時間 ===
  console.log("\n=== 問題2: 平均勤務時間 ===");
  for (const id in employeeStats) {
    const { name, totalHours, count } = employeeStats[id];
    const average = totalHours / count;
    console.log(`${name} の平均勤務時間: ${average.toFixed(2)} 時間`);
  }
}
main();
