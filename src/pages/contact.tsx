import homeData from '../../public/data/home.json';

export default function Contact() {
  return (
    <div className="page">
      <h1>{homeData.contact.title}</h1>
      <p>{homeData.contact.description}</p>
      <address>
        <strong>Quaid-e-Millat Public School Ameerabad</strong>
        <p>{homeData.contact.address}</p>
        <p>Phone: {homeData.contact.phone}</p>
        <p>Email: {homeData.contact.email}</p>
      </address>
    </div>
  );
}
