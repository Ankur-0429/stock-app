/**
   * 
   * @param year The range we want to define for the chart
   * @param symbol The stock ticker we want to input the display on the chart
   * @event res Sends a query to our backend to request the data we want
   * 
*/
export async function fetcher(symbol:string, year:number) {
    let res:Response = await fetch(process.env.NEXT_PUBLIC_URL + "" + year + "/query/?symbol=" + symbol)
    let data = res.json()
    return data
}