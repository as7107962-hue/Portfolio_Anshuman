type Props = { index: number; title: string; description: string; };
export function ProcessStep({ index, title, description }: Props) { return <div className="step"><div className="step-index">{index.toString().padStart(2, "0")}</div><div><h3 style={{ margin: "0 0 8px" }}>{title}</h3><p className="muted" style={{ margin: 0 }}>{description}</p></div></div>; }
