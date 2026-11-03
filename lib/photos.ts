/**
 * creative direction / photoshoots. drop the files in public/img/shoot/ and fill this in.
 * file: name without extension (webp), e.g. 'shoot/01'.
 */
export type Shoot = { title: string; line: string; credits: string; photos: { file?: string; alt: string }[] };

export const SHOOTS: Shoot[] = [
  {
    title: 'shoot 01',
    line: '[ the concept in one line ]',
    credits: 'creative direction: the peers collective · photo: [ name ] · model: [ name ]',
    photos: Array.from({ length: 8 }, (_, i) => ({ alt: `shoot 01, photo ${i + 1}` })),
  },
];
