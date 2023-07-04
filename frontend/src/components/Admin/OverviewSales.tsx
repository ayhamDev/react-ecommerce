import { Card, CardContent, CardHeader } from "@mui/material";
import { SxProps, useTheme } from "@mui/material/styles";
import { Chart } from "./chart";
import isMobile from "is-mobile";
import { useEffect, useState } from "react";

const useChartOptions = () => {
  const theme = useTheme();
  const [ismobile, setIsMobile] = useState(isMobile());
  const handleResize = () => {
    if (!ismobile && window.innerWidth < 800) {
      setIsMobile(true);
    } else if (ismobile && window.innerWidth >= 800) {
      setIsMobile(false);
    }
  };
  window.addEventListener("resize", handleResize);
  handleResize();
  useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return {
    chart: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      background: "transparent",
      stacked: ismobile ? true : false,
      toolbar: {
        show: true,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: true,
      fontFamily: "Roboto",
      fontSize: "16px",
      offsetY: "10px",
    },
    plotOptions: {
      bar: {
        columnWidth: ismobile ? "20px" : "25px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 10,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: any) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};
type OverViewSalesProps = {
  // @ts-ignore
  chartSeries: [];
  sx?: SxProps;
};
export const OverviewSales = (props: OverViewSalesProps) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader title="Sales" />
      <CardContent>
        <Chart
          height={"400px"}
          // @ts-ignore
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};
