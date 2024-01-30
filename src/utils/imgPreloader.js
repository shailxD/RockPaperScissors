function preloadImages() {
  const imagePaths = [
    "/left_1.webp",
    "/left_2.webp",
    "/left_3.webp",
    "/right_1.webp",
    "/right_2.webp",
    "/right_3.webp",
  ];

  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
}

export default preloadImages;
