export const CustomToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg font-bold">{label}</p>
        <ul>
          {payload.map((p: any, index: number) => (
            <li key={index} className="text-sm">
              {p.name}: {p.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
