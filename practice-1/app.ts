type AttendanceRecord = {
  employeeId: string;
  employeeName: string;
  date: string;
  hours: number;
};

async function dummyApi(): Promise<AttendanceRecord[]> {
  return [
    { employeeId: "E001", employeeName: "田中", date: "2024-04-01", hours: 8 },
    {
      employeeId: "E002",
      employeeName: "佐藤",
      date: "2024-04-01",
      hours: 7.5,
    },
    {
      employeeId: "E001",
      employeeName: "田中",
      date: "2024-04-02",
      hours: 8.5,
    },
    { employeeId: "E002", employeeName: "佐藤", date: "2024-04-02", hours: 6 },
    {
      employeeId: "E001",
      employeeName: "田中",
      date: "2024-04-03",
      hours: 7.5,
    },
    { employeeId: "E002", employeeName: "佐藤", date: "2024-04-03", hours: 7 },
  ];
}

async function main() {
  const data = await dummyApi();
  // console.log("取得した勤怠データ:", data);

  // === 問題1: 最も働いた社員 ===
  // TODO: 合計勤務時間が最大の人を探して表示
  let totalHoursMap: { [id: string]: { name: string; total: number } } = {};

  for (const record of data) {
    const id = record.employeeId;
    if (!totalHoursMap[id]) {
      totalHoursMap[id] = { name: record.employeeName, total: 0 };
    }
    totalHoursMap[id].total += record.hours;
  }

  let maxHours = 0;
  let topEmployeesName = "";

  for (const id in totalHoursMap) {
    if (totalHoursMap[id].total > maxHours) {
      maxHours = totalHoursMap[id].total;
      topEmployeesName = totalHoursMap[id].name;
    }
  }

  console.log(
    `最も働いた社員は ${topEmployeesName}さん で、合計 ${maxHours} 時間働きました！`
  );

  // === 問題2: 社員ごとの平均勤務時間 ===
  // TODO: 各社員の平均時間を算出し、名前と一緒に表示

  const workLog: {
    [id: string]: { name: string; hours: number[] };
  } = {};

  for (const record of data) {
    const id = record.employeeId;
    if (!workLog[id]) {
      workLog[id] = { name: record.employeeName, hours: [] };
    }
    workLog[id].hours.push(record.hours);
  }

  for (const id in workLog) {
    const { name, hours } = workLog[id];
    const total = hours.reduce((sum, h) => sum + h, 0);
    const avg = total / hours.length;
    console.log(`${name} さんの平均勤務時間は ${avg.toFixed(2)} 時間`);
  }

  // === 問題3: 前日より勤務時間が減った人を表示 ===
  // TODO: 社員ごとに日付順に比較して、減った日を抽出
  const recordsByEmployee: {
    [id: string]: AttendanceRecord[];
  } = {};

  // 社員ごとにデータをまとめる
  for (const record of data) {
    const id = record.employeeId;
    if (!recordsByEmployee[id]) {
      recordsByEmployee[id] = [];
    }
    recordsByEmployee[id].push(record);
  }

  // 各社員ごとに日付順に並べて、前日と比較
  for (const id in recordsByEmployee) {
    const records = recordsByEmployee[id];
    records.sort((a, b) => a.date.localeCompare(b.date));

    for (let i = 1; i < records.length; i++) {
      const prev = records[i - 1];
      const current = records[i];

      if (current.hours < prev.hours) {
        console.log(
          `${current.employeeName} さんは ${prev.date} より ${current.date} の方が勤務時間が減りました (${prev.hours} → ${current.hours})`
        );
      }
    }
  }
}

main();
