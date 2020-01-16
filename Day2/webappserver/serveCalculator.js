var serveCalc=
{
    handleCalculator(query)
    {
        const query = querystring.parse(query);
        const op = query.op,
            x = parseInt(query.x),
            y = parseInt(query.y);
        console.log(op, x, y);
        const result = calculator[op](x, y);
        return result;
    }
}
