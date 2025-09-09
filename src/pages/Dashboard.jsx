import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  MessageSquare,
  Bell,
  Eye,
  UserCheck,
  UserX,
  Calendar,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_COLORS, API_CONFIG } from "../config/constants";
import { useApp } from "../contexts/AppContext";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import StatsCard from "../components/common/StatsCard";

const Dashboard = () => {
  const { addNotification } = useApp();
  const [stats, setStats] = useState({
    totalUsers: 12345,
    activeUsers: 8432,
    blockedUsers: 234,
    totalRevenue: 1234567,
    monthlyRevenue: 89432,
    totalTransactions: 5678,
    pendingTickets: 23,
    activeSessions: 1432,
  });

  // Revenue chart data (monthly)
  const [revenueData] = useState([
    { month: "Jan", revenue: 45000, users: 1200, transactions: 450 },
    { month: "Feb", revenue: 52000, users: 1350, transactions: 520 },
    { month: "Mar", revenue: 48000, users: 1280, transactions: 480 },
    { month: "Apr", revenue: 61000, users: 1520, transactions: 610 },
    { month: "May", revenue: 55000, users: 1420, transactions: 550 },
    { month: "Jun", revenue: 67000, users: 1680, transactions: 670 },
    { month: "Jul", revenue: 72000, users: 1800, transactions: 720 },
    { month: "Aug", revenue: 69000, users: 1750, transactions: 690 },
    { month: "Sep", revenue: 78000, users: 1950, transactions: 780 },
    { month: "Oct", revenue: 84000, users: 2100, transactions: 840 },
    { month: "Nov", revenue: 89000, users: 2250, transactions: 890 },
    { month: "Dec", revenue: 95000, users: 2400, transactions: 950 },
  ]);

  // User analytics data
  const [userAnalytics] = useState([
    { name: "Active", value: 8432, color: CHART_COLORS.success },
    { name: "Inactive", value: 3877, color: CHART_COLORS.warning },
    { name: "Blocked", value: 234, color: CHART_COLORS.error },
  ]);

  // Recent activities
  const [recentActivities] = useState([
    {
      id: 1,
      type: "user_registered",
      user: "John Doe",
      time: "2 minutes ago",
      icon: UserCheck,
    },
    {
      id: 2,
      type: "transaction_completed",
      user: "Jane Smith",
      amount: 299,
      time: "5 minutes ago",
      icon: CreditCard,
    },
    {
      id: 3,
      type: "support_ticket",
      user: "Bob Johnson",
      time: "10 minutes ago",
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "user_blocked",
      user: "Alice Brown",
      time: "15 minutes ago",
      icon: UserX,
    },
    {
      id: 5,
      type: "notification_sent",
      count: 1250,
      time: "30 minutes ago",
      icon: Bell,
    },
  ]);

  // Transaction status data
  const [transactionData] = useState([
    { status: "Completed", count: 4521, amount: 892340 },
    { status: "Pending", count: 234, amount: 45670 },
    { status: "Failed", count: 123, amount: 12340 },
    { status: "Refunded", count: 89, amount: 8900 },
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      user_registered: UserCheck,
      transaction_completed: CreditCard,
      support_ticket: MessageSquare,
      user_blocked: UserX,
      notification_sent: Bell,
    };
    return iconMap[type] || Activity;
  };

  const getActivityColor = (type) => {
    const colorMap = {
      user_registered: "text-green-600",
      transaction_completed: "text-blue-600",
      support_ticket: "text-yellow-600",
      user_blocked: "text-red-600",
      notification_sent: "text-purple-600",
    };
    return colorMap[type] || "text-gray-600";
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "danger";
      case "refunded":
        return "info";
      default:
        return "default";
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new activity
      const activities = [
        "New user registered",
        "Transaction completed",
        "Support ticket created",
        "User blocked",
        "Notification sent",
      ];

      const randomActivity =
        activities[Math.floor(Math.random() * activities.length)];

      addNotification({
        title: "System Update",
        message: randomActivity,
        type: "info",
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  const mainStats = [
    {
      title: "Total Users",
      value: formatNumber(stats.totalUsers),
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Sessions",
      value: formatNumber(stats.activeSessions),
      change: "+8.2%",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(stats.monthlyRevenue),
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Support Tickets",
      value: stats.pendingTickets,
      change: "-5.1%",
      trend: "down",
      icon: MessageSquare,
    },
  ];

  const secondaryStats = [
    {
      title: "Active Users",
      value: formatNumber(stats.activeUsers),
      change: "+3.2%",
      trend: "up",
      icon: UserCheck,
    },
    {
      title: "Blocked Users",
      value: stats.blockedUsers,
      change: "+2.1%",
      trend: "up",
      icon: UserX,
    },
    {
      title: "Total Transactions",
      value: formatNumber(stats.totalTransactions),
      change: "+18.7%",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      change: "+22.4%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.trend === "up" ? "positive" : "negative"}
            icon={stat.icon ? <stat.icon /> : null}
            index={index}
          />
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {secondaryStats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.trend === "up" ? "positive" : "negative"}
            icon={stat.icon ? <stat.icon /> : null}
            index={index + 2}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <Card.Header className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Revenue Growth
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Revenue
              </span>
            </div>
          </Card.Header>
          <Card.Content className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Revenue"]}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* User Analytics Pie Chart */}
        <Card>
          <Card.Header>
            <Card.Title>User Status Distribution</Card.Title>
          </Card.Header>
          <Card.Content className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userAnalytics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userAnalytics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [formatNumber(value), "Users"]}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>
      </div>

      {/* Transactions and User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Trends */}
        <Card>
          <Card.Header>
            <Card.Title>Transaction Trends</Card.Title>
          </Card.Header>
          <Card.Content className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Bar dataKey="transactions" fill={CHART_COLORS.secondary} />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* User Growth */}
        <Card>
          <Card.Header>
            <Card.Title>User Growth</Card.Title>
          </Card.Header>
          <Card.Content className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={3}
                  dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <Card.Title>Recent Activities</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-full bg-white dark:bg-gray-800 ${getActivityColor(
                        activity.type
                      )}`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.type === "user_registered" &&
                          `${activity.user} registered`}
                        {activity.type === "transaction_completed" &&
                          `${
                            activity.user
                          } completed transaction of ${formatCurrency(
                            activity.amount
                          )}`}
                        {activity.type === "support_ticket" &&
                          `${activity.user} created a support ticket`}
                        {activity.type === "user_blocked" &&
                          `${activity.user} was blocked`}
                        {activity.type === "notification_sent" &&
                          `Notification sent to ${activity.count} users`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Content>
        </Card>

        {/* Transaction Status Summary */}
        <Card>
          <Card.Header>
            <Card.Title>Transaction Status</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {transactionData.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Badge variant={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.count} transactions
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
