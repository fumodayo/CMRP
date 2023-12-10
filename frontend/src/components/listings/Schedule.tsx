import { useMemo } from "react";
import { formatSchedule } from "../../utils/formatSchedule";

const Schedule = ({ schedule }) => {
  const calendar = useMemo(() => {
    return formatSchedule(schedule);
  }, [schedule]);

  return (
    <section className="space-y-5 p-3 max-h-[500px] overflow-auto">
      <ul className="list-none font-medium text-slate-600">
        {calendar.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default Schedule;
