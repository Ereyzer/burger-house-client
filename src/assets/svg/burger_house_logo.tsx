import type { PropsSvgIcon } from './iconProps.interface';

function BurgerHouseLogoSvg({
  fill = 'black',
  width = '250',
  height = '170',
  style = {},
}: PropsSvgIcon) {
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 250 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_1_73)">
        <path d="M23 137H233V140C233 153.807 221.807 165 208 165H48C34.1929 165 23 153.807 23 140V137Z" />
      </g>
      <path
        d="M231.5 138.5V140C231.5 152.979 220.979 163.5 208 163.5H48C35.0213 163.5 24.5 152.979 24.5 140V138.5H231.5Z"
        stroke={fill}
        strokeWidth="3"
      />
      <rect x="92.5" y="64.5" width="67" height="67" stroke={fill} strokeWidth="3" />
      <line x1="126.5" y1="63" x2="126.5" y2="133" stroke={fill} />
      <line x1="90" y1="96.5" x2="160" y2="96.5" stroke={fill} />
      <g filter="url(#filter1_d_1_73)">
        <path d="M21 118C21 109.716 27.7157 103 36 103H91V133H36C27.7157 133 21 126.284 21 118V118Z" />
        <path
          d="M36 104.5H89.5V131.5H36C28.5442 131.5 22.5 125.456 22.5 118C22.5 110.544 28.5442 104.5 36 104.5Z"
          stroke={fill}
          strokeWidth="3"
        />
      </g>
      <g filter="url(#filter2_d_1_73)">
        <path d="M161 103H216C224.284 103 231 109.716 231 118V118C231 126.284 224.284 133 216 133H161V103Z" />
        <path
          d="M216 104.5C223.456 104.5 229.5 110.544 229.5 118C229.5 125.456 223.456 131.5 216 131.5H162.5V104.5H216Z"
          stroke={fill}
          strokeWidth="3"
        />
      </g>
      <g filter="url(#filter3_d_1_73)">
        <path d="M125.768 11.3191C125.276 11.1148 124.724 11.1148 124.232 11.3191L26.0008 52.1532C23.9812 52.9927 24.5814 56 26.7685 56H223.232C225.419 56 226.019 52.9927 223.999 52.1532L125.768 11.3191Z" />
        <path
          d="M126.344 9.93359C125.484 9.57611 124.516 9.57611 123.656 9.93359L25.4248 50.7686C21.891 52.2379 22.9413 57.5 26.7686 57.5H223.231C227.059 57.5 228.109 52.2379 224.575 50.7686L126.344 9.93359Z"
          stroke={fill}
          strokeWidth="3"
          stroke-linejoin="round"
        />
      </g>
      <g filter="url(#filter4_d_1_73)">
        <path d="M159 63H214C222.284 63 229 69.7157 229 78V78C229 86.2843 222.284 93 214 93H159V63Z" />
        <path
          d="M214 64.5C221.456 64.5 227.5 70.5442 227.5 78C227.5 85.4558 221.456 91.5 214 91.5H160.5V64.5H214Z"
          stroke={fill}
          strokeWidth="3"
        />
      </g>
      <g filter="url(#filter5_d_1_73)">
        <path d="M23 78C23 69.7157 29.7157 63 38 63H93V93H38C29.7157 93 23 86.2843 23 78V78Z" />
        <path
          d="M38 64.5H91.5V91.5H38C30.5442 91.5 24.5 85.4558 24.5 78C24.5 70.5442 30.5442 64.5 38 64.5Z"
          stroke={fill}
          strokeWidth="3"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_1_73"
          x="23"
          y="137"
          width="210"
          height="32"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_73" />
        </filter>
        <filter
          id="filter1_d_1_73"
          x="17"
          y="103"
          width="78"
          height="38"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_73" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_73" result="shape" />
        </filter>
        <filter
          id="filter2_d_1_73"
          x="157"
          y="103"
          width="78"
          height="38"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_73" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_73" result="shape" />
        </filter>
        <filter
          id="filter3_d_1_73"
          x="17.7623"
          y="8.16592"
          width="214.475"
          height="58.8341"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_73" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_73" result="shape" />
        </filter>
        <filter
          id="filter4_d_1_73"
          x="155"
          y="63"
          width="78"
          height="38"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_73" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_73" result="shape" />
        </filter>
        <filter
          id="filter5_d_1_73"
          x="19"
          y="63"
          width="78"
          height="38"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_73" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_73" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default BurgerHouseLogoSvg;
