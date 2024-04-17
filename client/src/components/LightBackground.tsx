interface Props {
  children: React.ReactNode;
}

export default function LightBackground({ children }: Props) {
  return <div className="bg-lightGreen p-8 m-8 rounded-[36px] border-2 border-darkGreen">{children}</div>;
}
