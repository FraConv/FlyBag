import { useHistory } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: 'Jan', value: 19900 },
  { name: 'Feb', value: 13000 },
  { name: 'Mar', value: 12500 },
  { name: 'Apr', value: 12300 },
  { name: 'May', value: 12400 },
  { name: 'Jun', value: 12600 },
  { name: 'Jul', value: 14000 },
  { name: 'Aug', value: 15231.89 },
];

export default function Graphic() {
  const history = useHistory();


  return (
    <div
      className="absolute top-32 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={() => history.push("/Entrate")} // ⬅️
    >
      <Card className="bg-transparent border-[2px] border-[#d5e1e7] text-white rounded-xl p-6 w-[40vh] h-[240px] shadow-none hover:scale-105 transition">
        <CardContent className="p-0">
          <div className="mb-4">
            <h3 className="text-sm text-black">Total Revenue</h3>
            <p className="text-3xl text-black font-bold">$553.56</p>
            <p className="text-sm text-black">+20.1% from last month</p>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00C493"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}