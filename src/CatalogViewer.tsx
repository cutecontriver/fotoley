import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

interface Image {
  id: number;
  src: string;
  details: string;
}
const imageDetails =
  "Lorem Ipsum is simply dummy text of the printing and typLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.esetting industry.";
const images: Image[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: imageDetails,
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/70069/pexels-photo-70069.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: imageDetails,
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/6831526/pexels-photo-6831526.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: imageDetails,
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/689784/pexels-photo-689784.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: imageDetails,
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/731706/pexels-photo-731706.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: imageDetails,
  },
];

const CatalogViewer: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentImage(images[0]);
  }, []);

  useEffect(() => {
    if (slideshowActive) {
      startSlideshow();
    } else {
      stopSlideshow();
    }
  }, [slideshowActive]);

  const startSlideshow = () => {
    const interval = setInterval(() => {
      showNextImage();
    }, 3000);
    setSlideshowInterval(interval);
  };

  const stopSlideshow = () => {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
    }
  };

  const showPreviousImage = () => {
    const currentIndex = images.findIndex((image) => image === currentImage);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[previousIndex]);
  };

  const showNextImage = () => {
    const currentIndex = images.findIndex((image) => image === currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const showImage = (image: Image) => {
    setCurrentImage(image);
    if (slideshowActive) {
      stopSlideshow();
      startSlideshow();
    }
  };

  const toggleSlideshow = () => {
    setSlideshowActive(!slideshowActive);
  };

  return (
    <Box sx={{ p: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          {currentImage && (
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={currentImage.src}
                    alt={currentImage.details}
                  />
                  <br />
                  <Grid container spacing={1}>
                    <IconButton onClick={showPreviousImage} color="primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40"
                        viewBox="0 0 24 24"
                        width="40"
                      >
                        <path d="M14 7l-5 5 5 5V7z" />
                        <path d="M24 0v24H0V0h24z" fill="none" />
                      </svg>
                    </IconButton>
                    {images.map((image) => (
                      <Grid
                        item
                        key={image.id}
                        xs={2}
                        onClick={() => showImage(image)}
                      >
                        <Card
                          sx={{
                            filter:
                              currentImage === image
                                ? "none"
                                : "grayscale(100%)",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="50"
                            image={image.src}
                            alt={image.details}
                          />
                        </Card>
                      </Grid>
                    ))}
                    <IconButton onClick={showNextImage} color="primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40"
                        viewBox="0 0 24 24"
                        width="40"
                      >
                        <path d="M10 17l5-5-5-5v10z" />
                        <path d="M0 24V0h24v24H0z" fill="none" />
                      </svg>
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <CardContent>
                    <Typography variant="body2">
                      {currentImage.details}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 8,
                    }}
                  >
                    <IconButton onClick={toggleSlideshow} color="primary">
                      {slideshowActive ? (
                        <PauseCircleFilledIcon />
                      ) : (
                        <PlayCircleFilledIcon />
                      )}
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CatalogViewer;
