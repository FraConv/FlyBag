import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft } from "lucide-react";

const dataByRange = {
  giorno: [
    { name: "8:00", value: 300 },
    { name: "10:00", value: 260 },
    { name: "12:00", value: 340 },
    { name: "14:00", value: 310 },
    { name: "16:00", value: 350 },
    { name: "18:00", value: 420 },
  ],
  mese: [
    { name: "Week 1", value: 1300 },
    { name: "Week 2", value: 1400 },
    { name: "Week 3", value: 1200 },
    { name: "Week 4", value: 1500 },
  ],
  anno: [
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 15000 },
    { name: "Mar", value: 17000 },
  ],
  tutto: [
    { name: "2022", value: 80000 },
    { name: "2023", value: 95000 },
    { name: "2024", value: 102000 },
  ],
};

const Entrate: React.FC = () => {
  const [periodo, setPeriodo] = useState<"giorno" | "mese" | "anno" | "tutto">("giorno");

  // Calcolo del totale per il periodo selezionato
  const totalePeriodo = dataByRange[periodo].reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-4 max-w-md mx-auto mt-[2rem]">
      {/* Header */}
      <div className="flex items-center mb-4 text-black">
        <ChevronLeft className="scale-[120%] mt-1 text-black" />
        <span style={{color:"black"}} className="font-bold text-xl text-black ml-[1.2rem]">Guadagni</span>
      </div>

      {/* Period selector */}
      <div className="flex justify-end items-center">
        <div className="bg-[#F5F5F5] flex justify-between px-2 py-2 rounded-full mt-2">
          {["giorno", "mese", "anno", "tutto"].map((key) => (
            <button
              style={{
                borderRadius: 100,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 3,
                paddingBottom: 3,
              }}
              key={key}
              onClick={() => setPeriodo(key as typeof periodo)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                periodo === key
                  ? "bg-[#00C493] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {key === "giorno"
                ? "Day"
                : key === "mese"
                ? "Month"
                : key === "anno"
                ? "Year"
                : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue total */}
      <div className="mb-1 text-sm text-gray-500">Total Revenue</div>
      <div className="text-3xl font-bold mb-1 text-black">€ {totalePeriodo.toFixed(2)}</div>
      <div className="text-xs text-green-600 mb-3">+20,1% from last month</div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataByRange[periodo]}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
              dot={{ r: 4, stroke: "#000", strokeWidth: 1, fill: "#fff" }}
            />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis hide />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Boxes */}
      <div className="space-y-3">
        <div className="bg-[#E5FAF4] rounded-lg p-4">
          <p className="text-sm text-gray-600">Tot guadagni</p>
          <p className="text-xl font-semibold text-black">€ {totalePeriodo.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-lg p-3">
            <p className="text-sm text-gray-600">Tot costi spedizione</p>
            <p className="text-lg font-semibold text-black">€ 548.72</p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="text-sm text-gray-600">Tot costi</p>
            <p className="text-lg font-semibold text-black">€ 1097.44</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entrate;

