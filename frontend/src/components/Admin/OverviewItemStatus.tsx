import { ArrowUpwardRounded, ArrowDownwardRounded } from "@mui/icons-material";

import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  SxProps,
  Typography,
} from "@mui/material";

type OverviewItemStatusProps = {
  title: string;
  Icon: React.JSX.ElementType;
  iconColor: string;
  difference?: number;
  positive?: boolean;
  sx: SxProps;
  value: string;
};

export const OverviewItemStatus = (props: OverviewItemStatusProps) => {
  const {
    difference,
    positive = false,
    sx,
    value,
    title,
    Icon,
    iconColor,
  } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: iconColor,
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <Icon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
              </SvgIcon>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
