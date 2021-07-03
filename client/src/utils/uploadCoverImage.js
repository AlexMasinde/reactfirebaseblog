import { uploadImages } from "./axiosRequests";

export async function uploadCoverImage(coverImage) {
  const url = "http://localhost:5000/api/coverupload";
  const payload = await uploadImages(coverImage, url);
  const breakpoints = payload.data.breakpoints;
  const widths = breakpoints.map((breakpoint) => {
    return breakpoint.width;
  });

  const coverImageUrls = {};

  breakpoints.forEach((breakpoint) => {
    if (breakpoint.width === Math.max(...widths)) {
      coverImageUrls.large = breakpoint.secure_url;
    } else if (breakpoint.width === Math.min(...widths)) {
      coverImageUrls.small = breakpoint.secure_url;
    } else {
      coverImageUrls.medium = breakpoint.secure_url;
    }
  });

  return coverImageUrls;
}
