import Link from "next/link";

export default function Home() {
  return (
    <div>
     <Link href={"/interview"}>interview</Link>
     <br />
     <Link href={"/learning"}>learning</Link>
    </div>
  );
}
