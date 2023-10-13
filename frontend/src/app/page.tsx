"use client"
import useSWR from "swr";
import getUrlApi from '@/config';
import AppTable from '@/components/app.table';
export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    getUrlApi() + 'api/product',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  const dataSort = data?.sort(function (a, b) {
    return (b.productId - a.productId);
  });
  return (
    <div className="mt-3">
      <AppTable products={dataSort} />
    </div>
  )
}
