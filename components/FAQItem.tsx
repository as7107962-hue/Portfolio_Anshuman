type Props = { question: string; answer: string; };
export function FAQItem({ question, answer }: Props) { return <details className="faq-item"><summary>{question}</summary><p>{answer}</p></details>; }
