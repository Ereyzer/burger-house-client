import type { PropsSvgIcon } from './iconProps.interface';

function CloseIconSvg({
  width = '24px',
  height = '24px',
  fill = 'black',
  style = {},
}: PropsSvgIcon) {
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5388 6.26431C7.18728 5.9119 6.61584 5.9119 6.26433 6.26431C5.91191 6.61583 5.91191 7.18727 6.26433 7.53879L10.7259 12.0003L6.26433 16.4619C5.91191 16.8134 5.91191 17.3839 6.26433 17.7364C6.61584 18.0879 7.18728 18.0879 7.5388 17.7364L12.0004 13.2748L16.4619 17.7364C16.8134 18.0879 17.384 18.0879 17.7364 17.7364C18.0879 17.3839 18.0879 16.8134 17.7364 16.4619L13.2748 12.0003L17.7364 7.53879C18.0879 7.18727 18.0879 6.61583 17.7364 6.26431C17.384 5.9119 16.8134 5.9119 16.4619 6.26431L12.0004 10.7259L7.5388 6.26431Z"
        fill={fill}
      />
    </svg>
  );
}

export default CloseIconSvg;
