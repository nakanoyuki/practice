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

  for (const record of data) {
    const hours = getWorkingHours(record.checkIn, record.checkOut);
    console.log(`${record.name}: ${hours}時間`);
  }
}

main();
