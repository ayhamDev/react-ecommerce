import { PendingRounded, LocalShippingRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Chart } from "./chart";

const useChartOptions = (labels: any) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      toolbar: {
        show: true,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.success.main],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: true,
      fontFamily: "Roboto",
      position: "top",
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMap = {
  Pending: (
    <SvgIcon>
      <PendingRounded color="primary" />
    </SvgIcon>
  ),
  Delivered: (
    <SvgIcon>
      <LocalShippingRounded color="success" />
    </SvgIcon>
  ),
};

type OverviewStatusProps = {
  chartSeries: number[];
  labels: string[];
  sx: SxProps;
};

export const OverviewStatus = (props: OverviewStatusProps) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useChartOptions(labels);
  const Theme = useTheme();
  return (
    <Card sx={sx}>
      <CardHeader title="Orders Status" />
      <CardContent>
        <Chart
          height={300}
          // @ts-ignore
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* @ts-ignore */}
                {iconMap[label]}
                <Typography
                  sx={{ my: 1 }}
                  variant="h6"
                  color={
                    label == "Pending"
                      ? Theme.palette.primary.main
                      : Theme.palette.success.main
                  }
                >
                  {label}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {item}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};
