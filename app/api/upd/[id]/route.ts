export function GET(req, params) {
    console.log("req=", req)
    console.log("req=", params.params)

    return new Response("test")
}