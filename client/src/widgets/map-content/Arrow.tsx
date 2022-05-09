import { FC } from 'react';

type Props = {
  from: Point;
  to: Point;
  fromSizes: Sizes;
  toSizes: Sizes;
};

export const Arrow: FC<Props> = ({ from, to, fromSizes, toSizes }) => {
  let d = '';

  if (from.y < to.y - fromSizes.height) {
    d = dependenceOnTop(fromSizes, toSizes, from, to);
  }
  if (to.y < from.y - fromSizes.height) {
    d = dependenceOnBottom(fromSizes, toSizes, from, to);
  }

  if (
    Math.abs(to.y - from.y) < fromSizes.height * 3 &&
    from.x + fromSizes.width < to.x
  ) {
    d = dependenceOnLeft(fromSizes, toSizes, from, to);
  }
  if (
    Math.abs(to.y - from.y) < fromSizes.height * 3 &&
    to.x + fromSizes.width < from.x
  ) {
    d = dependenceOnRight(fromSizes, toSizes, from, to);
  }

  return (
    <g>
      <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <g fill="none" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)">
        <path
          fill="none"
          stroke="black"
          strokeWidth="1px"
          vectorEffect="non-scaling-stroke"
          d={d}
        />
      </g>
    </g>
  );
};

export function dependenceOnTop(fromSizes: Sizes, toSizes: Sizes, from: Point, to: Point) {
  const ft = from.y + fromSizes.height;
  const fl = from.x + fromSizes.width / 2;
  const tl = to.x + toSizes.width / 2;
  const diff = Math.abs(ft - to.y) / 2;
  return `M ${fl} ${ft},  C${fl} ${ft + diff} ${tl} ${to.y - diff}, ${tl} ${
    to.y
  }`;
}

export function dependenceOnBottom(fromSizes: Sizes, toSizes: Sizes, from: Point, to: Point) {
  const tt = to.y + toSizes.height;
  const tl = to.x + toSizes.width / 2;
  const fl = from.x + fromSizes.width / 2;
  const diff = Math.abs(from.y - tt) / 2;
  return `M ${fl} ${from.y}, C${fl} ${from.y - diff} ${tl} ${
    tt + diff
  }, ${tl} ${tt}`;
}

export function dependenceOnLeft(fromSizes: Sizes, toSizes: Sizes, from: Point, to: Point) {
  const fl = from.x + fromSizes.width;
  const ft = from.y + fromSizes.height / 2;
  const tt = to.y + toSizes.height / 2;
  return `M ${fl} ${ft}, ${to.x} ${tt}`;
}

export function dependenceOnRight(fromSizes: Sizes, toSizes: Sizes, from: Point, to: Point) {
  const tl = to.x + toSizes.width;
  const tt = to.y + toSizes.height / 2;
  const ft = from.y + fromSizes.height / 2;
  return `M ${from.x} ${ft}, ${tl} ${tt}`;
}
