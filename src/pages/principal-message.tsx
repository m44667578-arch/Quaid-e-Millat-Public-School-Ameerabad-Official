import homeData from '../../public/data/home.json';

export default function PrincipalMessage() {
  return (
    <div className="page">
      <h1>Principal Message</h1>
      <blockquote>{homeData.principal.message}</blockquote>
      <p>{homeData.principal.name}</p>
    </div>
  );
}
