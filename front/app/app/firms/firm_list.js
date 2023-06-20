import Link from 'next/link';

export function FirmList({firms}) {
  return(
    <>
      <ul>
        {firms.map((firm) => (
          <li key={firm.id}>
            <Link href={`/firms/${firm.id}`} className="link">
              {firm.firm_name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}