import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

interface Rank {
  email: string;
  numberOfProgram: number;
}

function Leaderboard() {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://backend-nine-red-85.vercel.app/api/allrank")
      .then((res) => {
        setRanks(res.data.rank);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-zinc-700 flex flex-col">
      <Navbar programdet={false} leaderboard={true} />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-10">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-100">Global Ranking</h1>
          <p className="text-sm text-zinc-500 mt-1">Top problem solvers across the platform.</p>
        </div>

        {/* Leaderboard Table Container */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            
            {/* Table Head */}
            <thead className="bg-zinc-950/50 text-zinc-400 font-medium border-b border-zinc-800">
              <tr>
                <th className="px-6 py-3 w-24 text-center">Rank</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3 w-40 text-center">Problems Solved</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-800/50">
              {loading ? (
                // Loading Skeleton
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse bg-zinc-900">
                    <td className="px-6 py-4"><div className="h-4 w-6 bg-zinc-800 rounded mx-auto"></div></td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
                      <div className="h-4 w-48 bg-zinc-800 rounded"></div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 w-8 bg-zinc-800 rounded mx-auto"></div></td>
                  </tr>
                ))
              ) : ranks.length > 0 ? (
                // Actual Data Rows
                ranks.map((element, index) => {
                  let rankTextClass = "text-zinc-500 font-medium";
                  let rowClass = "hover:bg-zinc-800/30 transition-colors group bg-zinc-900";
                  
                  // Top 3 specific LeetCode-style subtle colors
                  if (index === 0) {
                    rankTextClass = "text-yellow-500 font-bold";
                    rowClass = "bg-yellow-500/[0.02] hover:bg-yellow-500/[0.05] transition-colors";
                  } else if (index === 1) {
                    rankTextClass = "text-zinc-300 font-bold";
                  } else if (index === 2) {
                    rankTextClass = "text-amber-600 font-bold";
                  }

                  return (
                    <tr key={index} className={rowClass}>
                      
                      {/* Rank Number */}
                      <td className={`px-6 py-4 text-center ${rankTextClass}`}>
                        {index + 1}
                      </td>
                      
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Auto-generated avatar based on email for a nice touch */}
                          <img
                            className="w-6 h-6 rounded-full border border-zinc-700 opacity-80 group-hover:opacity-100 transition-opacity bg-zinc-800"
                            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${element.email}`}
                            alt="avatar"
                          />
                          <span className={`font-medium ${index < 3 ? "text-zinc-200" : "text-zinc-300"}`}>
                            {element.email.split("@")[0]}
                          </span>
                          <span className="text-zinc-500 text-xs hidden sm:inline">
                            ({element.email})
                          </span>
                        </div>
                      </td>
                      
                      {/* Solved Count */}
                      <td className="px-6 py-4 text-center text-zinc-300 font-mono">
                        {element.numberOfProgram}
                      </td>

                    </tr>
                  );
                })
              ) : (
                // Empty State
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-zinc-500">
                    No ranking data available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;