export const CustomToolTip = ({ active, payload, label, barLabel }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-fuchsia-50 p-4 rounded-md shadow-md">
        <p className="mb-4">
          <span className="text-xs uppercase tracking-wide -mb-2">
            {barLabel}
          </span>
          <br />
          <span className="text-lg font-bold">{label}</span>
        </p>
        <ul>
          {payload.map((p: any, index: number) => (
            <li key={index} className="text-sm">
              {p.name.replace("_", " ")}:{" "}
              <span className="font-semibold">{p.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
