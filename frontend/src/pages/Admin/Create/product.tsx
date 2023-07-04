import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SetName } from "../../../store/slice/Page";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  IconButton,
} from "@mui/material";
import CircularProgressWithLabel from "../../../components/CircularProgressWithLabel";
import { useQuery } from "@tanstack/react-query";
import GetCatagory from "../../../api/GetCatagories";
import { useSelector } from "react-redux";
import api from "../../../api/API";
import { RootState } from "../../../store/Store";
import {
  ArrowBackIosNewRounded,
  Clear,
  CloudUpload,
} from "@mui/icons-material";
import { AdminMotionProps } from "../../../utils/ConfigMotion";
import { motion } from "framer-motion";
import useAdminAuth from "../../../hooks/useAdminAuth";
type ImageUploadLoading = {
  url: string;
  isLoading: boolean;
  progress: number;
  id: number;
  urlID?: string;
  file?: object;
};
const ProductCreate = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { VerifyToken, admin } = useAdminAuth();
  useLayoutEffect(() => {
    dispacth(SetName("Create Product"));
    VerifyToken();
  });
  const FileTypes = ["image/png", "image/jpg", "image/jpeg"];

  // Redux

  const Theme = useTheme();
  // Refs
  const inputFile = useRef<HTMLInputElement | null>(null);
  // States
  const [SelectedAvailability, SetSelectedAvailability] = useState<number>();

  const [ImageRemoved, SetImageRemoved] = useState<string[]>([]);
  const [isUpdating, SetIsUpdating] = useState(false);
  const [ImageLoading, SetImageLoading] = useState<ImageUploadLoading[] | []>(
    []
  );
  const [copied, SetCopied] = useState(false);
  const [ProgressValue, SetProgressValue] = useState({});
  const [Drag, SetDrag] = useState(false);
  const [SelectedCatagory, SetSelectedCatagory] = useState<string | undefined>(
    ""
  );
  const [TitleState, SetTitleState] = useState<string>("");

  const [descriptionState, SetDescriptionState] = useState<string>("");

  const [priceState, SetPriceState] = useState<number>(0);
  const [UnitState, SetUnitState] = useState<string>("");
  const [TitleError, SetTitleError] = useState<{
    error: boolean;
    text: string;
  }>({
    error: false,
    text: "",
  });
  const [DescriptionError, SetDescriptionError] = useState<{
    error: boolean;
    text: string;
  }>({
    error: false,
    text: "",
  });
  const [PriceError, SetPriceError] = useState<{
    error: boolean;
    text: string;
  }>({
    error: false,
    text: "",
  });
  const [SelectCatagoryError, SetSelectCatagoryError] = useState<{
    error: boolean;
    text: string;
  }>({
    error: false,
    text: "",
  });
  const [UnitStateError, SetUnitStateError] = useState<{
    error: boolean;
    text: string;
  }>({
    error: false,
    text: "",
  });
  // Quarys

  const AvailabilityChangeHandler = (event: SelectChangeEvent) => {
    // @ts-ignore
    SetSelectedAvailability(event.target.value);
  };
  const CatagoryChangeHandler = (event: SelectChangeEvent) => {
    SetSelectedCatagory(event.target.value);
  };
  const handleCloseSnakbar = (_: any, reason: string) => {
    if (reason === "clickaway") {
      return SetCopied(false);
    }
    if (reason == "timeout") {
      SetCopied(false);
    }
  };
  const { data: CatagoryData } = useQuery({
    queryKey: ["catagory"],
    queryFn: GetCatagory,
  });

  const UpdateProductHandler = async () => {
    SetIsUpdating(true);
    // @ts-ignore
    let images_id = ImageLoading.map((img) => {
      if (!img.urlID) return;
      return img.urlID;
    });
    images_id = images_id.filter((img) => img !== undefined);
    if (ImageLoading.length == 0) {
      try {
        await api.post(
          `/product`,
          {
            title: TitleState,
            description: descriptionState,
            price: priceState,
            catagory: SelectedCatagory,
            availability: SelectedAvailability,
            unit: UnitState,
            images: [],
          },
          {
            headers: {
              Authorization: `Bearer ${admin.accessToken}`,
            },
          }
        );

        ImageRemoved.forEach(async (img) => {
          try {
            await api.delete(`/image/${img}`, {
              headers: {
                Authorization: `Bearer ${admin.accessToken}`,
              },
            });
          } catch (err) {
            console.log(err);
          }
        });
        navigate("/admin/product");
      } catch (err) {
        TitleState.length == 0
          ? SetTitleError({ error: true, text: "This Field Is Required." })
          : null;
        descriptionState.length == 0
          ? SetDescriptionError({
              error: true,
              text: "This Field Is Required.",
            })
          : null;
        priceState <= 0
          ? SetPriceError({ error: true, text: "This Field Is Required." })
          : null;
        SelectedCatagory?.length == 0
          ? SetSelectCatagoryError({
              error: true,
              text: "This Field Is Required.",
            })
          : null;
        // @ts-ignore

        ![0, 1].includes(SelectedAvailability)
          ? SetSelectCatagoryError({
              error: true,
              text: "This Field Is Required.",
            })
          : null;
        UnitState?.length == 0
          ? SetUnitStateError({
              error: true,
              text: "This Field Is Required.",
            })
          : null;
        console.log(err);
      }
    }
    ImageLoading.forEach(async (image, index) => {
      const file = ImageLoading.find((img) => img.file != undefined);
      if (!file) {
        try {
          await api.post(
            `/product`,
            {
              title: TitleState,
              description: descriptionState,
              price: priceState,
              catagory: SelectedCatagory,
              availability: SelectedAvailability,
              unit: UnitState,
              images: images_id.map((img) => {
                return img;
              }),
            },
            {
              headers: {
                Authorization: `Bearer ${admin.accessToken}`,
              },
            }
          );
          ImageRemoved.forEach(async (img) => {
            try {
              await api.delete(`/image/${img}`, {
                headers: {
                  Authorization: `Bearer ${admin.accessToken}`,
                },
              });
            } catch (err) {
              console.log(err);
            }
          });
          navigate("/admin/product");
        } catch (err) {
          TitleState.length == 0
            ? SetTitleError({ error: true, text: "This Field Is Required." })
            : null;
          descriptionState.length == 0
            ? SetDescriptionError({
                error: true,
                text: "This Field Is Required.",
              })
            : null;
          priceState <= 0
            ? SetPriceError({ error: true, text: "This Field Is Required." })
            : null;
          SelectedCatagory?.length == 0
            ? SetSelectCatagoryError({
                error: true,
                text: "This Field Is Required.",
              })
            : null;
          // @ts-ignore

          ![0, 1].includes(SelectedAvailability)
            ? SetSelectCatagoryError({
                error: true,
                text: "This Field Is Required.",
              })
            : null;
          UnitState?.length == 0
            ? SetUnitStateError({
                error: true,
                text: "This Field Is Required.",
              })
            : null;
          console.log(err);
        }
      }
      if (file) {
        if (!image.file) return null;
        const Form = new FormData();

        // @ts-ignore

        Form.append("image", image.file);

        try {
          const ImageUpload = await api.post("/image", Form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${admin.accessToken}`,
            },
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              // @ts-ignore
              const percent = Math.floor((loaded * 100) / total);
              SetProgressValue((prev) => {
                return { ...prev, [image.id]: { value: percent } };
              });
            },
          });
          if (ImageUpload.status === 200) {
            // @ts-ignore

            images_id.push(ImageUpload.data.id);
            SetProgressValue((prev) => {
              return { ...prev, [image.id]: { value: 100 } };
            });
            if (index == ImageLoading.length - 1) {
              try {
                await api.post(
                  `/product`,
                  {
                    title: TitleState,
                    description: descriptionState,
                    price: priceState,
                    catagory: SelectedCatagory,
                    availability: SelectedAvailability,
                    unit: UnitState,
                    images: images_id.map((img) => {
                      return img;
                    }),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${admin.accessToken}`,
                    },
                  }
                );
                navigate("/admin/product");
              } catch (err) {
                TitleState.length == 0
                  ? SetTitleError({
                      error: true,
                      text: "This Field Is Required.",
                    })
                  : null;
                descriptionState.length == 0
                  ? SetDescriptionError({
                      error: true,
                      text: "This Field Is Required.",
                    })
                  : null;
                priceState <= 0
                  ? SetPriceError({
                      error: true,
                      text: "This Field Is Required.",
                    })
                  : null;
                SelectedCatagory?.length == 0
                  ? SetSelectCatagoryError({
                      error: true,
                      text: "This Field Is Required.",
                    })
                  : null;
                // @ts-ignore

                ![0, 1].includes(SelectedAvailability)
                  ? SetSelectCatagoryError({
                      error: true,
                      text: "This Field Is Required.",
                    })
                  : null;
                UnitState?.length == 0
                  ? SetUnitStateError({
                      error: true,
                      text: "This Field Is Required.",
                    })
                  : null;
                console.log(err);
              }
            }
          }
        } catch (err) {
          TitleState.length == 0
            ? SetTitleError({ error: true, text: "This Field Is Required." })
            : null;
          descriptionState.length == 0
            ? SetDescriptionError({
                error: true,
                text: "This Field Is Required.",
              })
            : null;
          priceState <= 0
            ? SetPriceError({ error: true, text: "This Field Is Required." })
            : null;
          SelectedCatagory?.length == 0
            ? SetSelectCatagoryError({
                error: true,
                text: "This Field Is Required.",
              })
            : null;
          // @ts-ignore
          ![0, 1].includes(SelectedAvailability)
            ? SetSelectCatagoryError({
                error: true,
                text: "This Field Is Required.",
              })
            : null;
          UnitState?.length == 0
            ? SetUnitStateError({
                error: true,
                text: "This Field Is Required.",
              })
            : null;
          console.log(err);
        }
      }
    });
  };
  const HandleFileUpload = async (file: any) => {
    const id = Math.floor(Date.now() + Math.random() * 1000);
    if (!FileTypes.includes(file.type)) return null;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      SetImageLoading((prev: any) => {
        return [
          ...prev,
          { url: reader.result, isLoading: true, progress: 0, id, file },
        ];
      });
    };
  };

  const HandleDelete = async (id: any, urlID: any, isLoading: any) => {
    ImageLoading.forEach((img, index) => {
      if (img.id === id) {
        ImageLoading.splice(index, 1);
        !isLoading ? SetImageRemoved((prev) => [...prev, urlID]) : null;
        SetImageLoading([...ImageLoading]);
      }
    });
  };
  const page = useSelector((state: RootState) => state.Page.value);
  return (
    <motion.div {...AdminMotionProps}>
      <Box
        paddingBottom={Theme.spacing(4)}
        display={"flex"}
        alignItems={"center"}
        gap={Theme.spacing(2)}
      >
        <IconButton
          onClick={() => {
            navigate("/admin/product");
          }}
        >
          <ArrowBackIosNewRounded fontSize="medium" />
        </IconButton>
        <Typography variant="h5">{page}</Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={Theme.spacing(2)}
        flexWrap={"wrap"}
      >
        <Paper
          elevation={2}
          sx={{
            minWidth: {
              xs: "260px",
              sm: "300px",
            },
            padding: Theme.spacing(2),
            flex: "1",
          }}
        >
          <Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={Theme.spacing(4)}
            >
              <TextField
                id="titleRef"
                name="title"
                label="Title"
                variant="outlined"
                value={TitleState}
                onChange={(e) => SetTitleState(e.target.value)}
                autoFocus
                fullWidth
                required
                error={TitleError.error}
                helperText={TitleError.text}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                value={descriptionState}
                onChange={(e) => SetDescriptionState(e.target.value)}
                fullWidth
                required
                multiline
                rows={5}
                error={DescriptionError.error}
                helperText={DescriptionError.text}
              />
              <TextField
                id="price"
                name="price"
                type="number"
                label="Price (In Cents)"
                variant="outlined"
                value={priceState}
                onChange={(e) => SetPriceState(eval(e.target.value))}
                fullWidth
                required
                error={PriceError.error}
                helperText={PriceError.text}
              />
              <TextField
                id="Unit"
                name="Unit"
                label="Unit"
                variant="outlined"
                value={UnitState}
                onChange={(e) => SetUnitState(e.target.value)}
                fullWidth
                required
                error={UnitStateError.error}
                helperText={UnitStateError.text}
              />

              <FormControl fullWidth required>
                <InputLabel id="select-availability">availability</InputLabel>

                <Select
                  labelId="select-availability"
                  id="availability"
                  label="availability"
                  // @ts-ignore
                  value={SelectedAvailability}
                  onChange={AvailabilityChangeHandler}
                  error={SelectCatagoryError.error}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: "200px",
                        overflowY: "auto",
                      },
                    },
                  }}
                  required
                >
                  <MenuItem value={1}>In Stock</MenuItem>
                  <MenuItem value={0}>Out Of Stock</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel id="select-catagory">Catagory</InputLabel>

                <Select
                  labelId="select-catagory"
                  id="catagory"
                  label="Catagory"
                  value={SelectedCatagory}
                  onChange={CatagoryChangeHandler}
                  error={SelectCatagoryError.error}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: "200px",
                        overflowY: "auto",
                      },
                    },
                  }}
                  required
                >
                  {CatagoryData?.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.catagory._id}>
                      {item.catagory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Snackbar
            open={copied}
            message="Copied To Clipboard."
            autoHideDuration={3000}
            onClose={handleCloseSnakbar}
            onClick={() => SetCopied(false)}
          />
        </Paper>
        <Paper
          elevation={Drag ? 12 : 2}
          sx={{
            position: "relative",
            minWidth: {
              xs: "260px",
              sm: "300px",
            },
            minHeight: "300px",
            padding: Theme.spacing(2),
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: Theme.spacing(2),
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            position={"relative"}
            zIndex={2}
          >
            <Typography variant="h6">Image Upload</Typography>
            <Button
              variant="contained"
              onClick={() => {
                inputFile.current?.click();
              }}
            >
              Choose Image
            </Button>
            <input
              type="file"
              ref={inputFile}
              onChange={(e) => {
                const Files = e.target.files;
                [...Files].forEach(HandleFileUpload);
              }}
              style={{ display: "none" }}
              multiple
            />
          </Box>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              if (!Drag) return SetDrag(true);
            }}
            onDragLeave={() => {
              if (Drag) return SetDrag(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              SetDrag(false);
              const Files = e.dataTransfer.files;
              [...Files].forEach(HandleFileUpload);
            }}
            style={{
              position: "absolute",
              zIndex: 1,
              inset: 0,
            }}
          ></div>
          <Box
            width={"100%"}
            height={"100%"}
            flex={"1"}
            border={"5px dotted black"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <CloudUpload sx={{ fontSize: "80px" }} />
              <Typography variant="subtitle2">
                {Drag
                  ? "! Drop The Image Here !"
                  : "Drag & Drop Here To Upload Images"}
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            position: "relative",
            minWidth: {
              xs: "260px",
              sm: "300px",
            },
            padding: Theme.spacing(2),
            flex: "1",
          }}
        >
          <Typography variant="h6">Uploaded Images</Typography>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            paddingTop={Theme.spacing(2)}
            sx={{
              justifyContent: {
                xs: "center",
                sm: "start",
              },
            }}
            gap={Theme.spacing(2)}
          >
            {ImageLoading.map((image, index) => (
              <Box key={index} position={"relative"}>
                <Box position={"absolute"} top={"5px"} right={"5px"} zIndex={2}>
                  <IconButton
                    onClick={() =>
                      HandleDelete(image.id, image.urlID, image.isLoading)
                    }
                  >
                    <Clear color="warning" />
                  </IconButton>
                </Box>
                {image.isLoading ? (
                  <Box
                    position={"absolute"}
                    width={"100%"}
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ inset: 0 }}
                  >
                    <CircularProgressWithLabel
                      // @ts-ignore
                      value={ProgressValue[image.id]?.value || 0}
                    />
                  </Box>
                ) : null}

                <img
                  style={{
                    flex: 1,
                    width: "150px",
                    height: "150px",
                    borderRadius: "5px",
                  }}
                  src={image.url}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
      <Box
        width={"100%"}
        justifyContent={"end"}
        paddingY={Theme.spacing(3)}
        display={"flex"}
        gap={Theme.spacing(2)}
      >
        <Button
          onClick={() => navigate("/admin/product")}
          variant="outlined"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button
          disabled={isUpdating}
          onClick={UpdateProductHandler}
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </motion.div>
  );
};

export default ProductCreate;
