<script setup lang="ts">
import { Line, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "~/types/charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const bookingsData: ChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Bookings",
      data: [65, 89, 123, 156, 132, 145],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      fill: true,
    },
  ],
};

const ratingsData: ChartData = {
  labels: ["5★", "4★", "3★", "2★", "1★"],
  datasets: [
    {
      label: "Rating Distribution",
      data: [45, 32, 15, 5, 3],
      backgroundColor: ["#22c55e", "#3b82f6", "#eab308", "#f97316", "#ef4444"],
    },
  ],
};

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};
</script>

<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold">Booking Trends</h3>
      </template>
      <div class="h-64">
        <Line :data="bookingsData" :options="chartOptions" />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-base font-semibold">Rating Distribution</h3>
      </template>
      <div class="h-64">
        <Bar :data="ratingsData" :options="chartOptions" />
      </div>
    </UCard>
  </div>
</template>
