type CloudinaryTransform = (
  url: string,
  obj?: {
    w?: number;
    h?: number;
    crop?:
      | 'auto'
      | 'auto_pad'
      | 'crop'
      | 'fill'
      | 'fill_pad'
      | 'fit'
      | 'imagga_crop'
      | 'imagga_scale'
      | 'lfill'
      | 'limit'
      | 'lpad'
      | 'mfit'
      | 'mpad'
      | 'pad'
      | 'scale'
      | 'thumb';
  },
) => string;

export const cloudinaryTransform: CloudinaryTransform = (
  url,
  { w = 200, h = 200, crop = 'fill' } = {},
) => {
  return url.replace('/upload/', `/upload/c_${crop},w_${w},h_${h},q_auto,f_auto/`);
};
