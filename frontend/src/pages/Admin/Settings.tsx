import {
  Box,
  Paper,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Autocomplete,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { PaidRounded } from "@mui/icons-material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { currencies } from "currencies.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { SetName } from "../../store/slice/Page";
import { useNavigate } from "react-router-dom";
import api from "../../api/API";
import { useQuery } from "@tanstack/react-query";
import GetSettings from "../../api/GetSettings";
import LoadingSpinner from "../../components/LoadingSpinner";

type Currency = currencies;
const Settings = () => {
  const Theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  useLayoutEffect(() => {
    dispatch(SetName("Settings"));
  });

  const { data, status } = useQuery({
    queryKey: ["settings"],
    queryFn: () => GetSettings(auth.accessToken),
  });

  const [CurrentCurrency, SetCurrentCurrency] = useState<Currency>(
    currencies.find((currency) => currency.code == "USD")
  );
  const [TaxPercentage, SetTaxPercentage] = useState(``);
  const [UseTax, SetUseTax] = useState(false);
  const [deliveryFee, SetDeliveryFee] = useState(``);
  const [CurrencyError, SetCurrencyError] = useState<{
    error: boolean;
    text: string;
  }>({
    error: false,
    text: "",
  });

  const handleTaxInput = (event: InputEvent) => {
    SetTaxPercentage(
      Number(event.currentTarget.value.replace(/[a-z]|[A-Z]|[أ-ي]/g, ``))
    );
  };
  const handleDeliveryInput = (event: InputEvent) => {
    SetDeliveryFee(
      Number(event.currentTarget.value.replace(/[a-z]|[A-Z]|[أ-ي]/g, ``))
    );
  };

  const handleUpdateSettings = async () => {
    if (CurrentCurrency == null)
      return SetCurrencyError({
        text: "This Field is required",
        error: true,
      });
    SetCurrencyError({
      text: "",
      error: false,
    });
    try {
      await api.put(
        "/settings",
        {
          currency: CurrentCurrency,
          tax: {
            useTax: UseTax,
            taxAmount: TaxPercentage,
          },
          deliveryFee: deliveryFee,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!data) return;
    SetCurrentCurrency(data?.currency);
    SetUseTax(data?.tax.useTax);
    SetTaxPercentage(data?.tax.taxAmount);
    SetDeliveryFee(data?.deliveryFee);
  }, [data]);
  const page = useSelector((state: RootState) => state.Page.value);

  if (status == "loading") return <LoadingSpinner />;
  if (status == "error") return <LoadingSpinner />;
  return (
    <>
      <Typography variant="h5" paddingBottom={Theme.spacing(2)}>
        {page}
      </Typography>
      <Box
        paddingY={Theme.spacing(2)}
        display={"flex"}
        flexDirection={"column"}
        gap={Theme.spacing(2)}
      >
        <List component={Paper} elevation={2} disablePadding={false}>
          <ListItem>
            <Autocomplete
              id="currency-select"
              sx={{ width: 300 }}
              options={currencies}
              value={CurrentCurrency}
              autoHighlight
              getOptionLabel={(option) => {
                return `${option.code} - ${option.symbolNative}`;
              }}
              onChange={(_, newValue) => {
                console.log(newValue);

                SetCurrentCurrency(newValue);
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                  key={option.code}
                >
                  {option.code} - {option.symbolNative}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  error={CurrencyError.error}
                  {...params}
                  label="Choose Currency"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </ListItem>
          <Typography paddingLeft={Theme.spacing(2)}>
            {CurrencyError.error && CurrencyError.text}
          </Typography>
        </List>
        <List component={Paper} elevation={2} disablePadding={false}>
          <ListItem>
            <ListItemButton
              onClick={() => {
                SetUseTax(!UseTax);
              }}
              sx={{
                borderRadius: "15px",
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <PaidRounded />
              </ListItemIcon>
              <ListItemText>Enable Tax</ListItemText>
              <Switch edge="end" checked={UseTax} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <TextField
              label="Tax"
              disabled={!UseTax}
              placeholder="Percentage %"
              value={TaxPercentage || ``}
              onChange={handleTaxInput}
              fullWidth
            />
            <TextField disabled value="%" sx={{ width: "45px" }} />
          </ListItem>
        </List>
        <List component={Paper} elevation={2} disablePadding={false}>
          <ListItem>
            <TextField
              label="Delivery Fee (in Cents)"
              placeholder="Amount (in Cents)"
              value={deliveryFee || ``}
              onChange={handleDeliveryInput}
              fullWidth
            />
          </ListItem>
        </List>
        <Box
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
          gap={Theme.spacing(2)}
          paddingTop={Theme.spacing(2)}
        >
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdateSettings}>
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
