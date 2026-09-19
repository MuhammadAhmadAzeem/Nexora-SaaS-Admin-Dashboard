export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: "New user registered",
      description: "Ali Khan created an account",
      time: "5 min ago",
      icon: "👤",
    },
    {
      id: 2,
      title: "Project created",
      description: "Nexora Website project was created",
      time: "20 min ago",
      icon: "📁",
    },
    {
      id: 3,
      title: "Payment received",
      description: "Payment of $1,250 was received",
      time: "1 hour ago",
      icon: "💳",
    },
    {
      id: 4,
      title: "Task completed",
      description: "Dashboard UI task was completed",
      time: "2 hours ago",
      icon: "✓",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Activity
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Latest activity from your system
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3"
          >
            <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-50 flex items-center justify-center">
              {activity.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium text-slate-900">
                {activity.title}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {activity.description}
              </p>
            </div>

            <span className="text-xs text-slate-400 whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}