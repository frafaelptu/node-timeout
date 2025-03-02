const trackRequestAbort = (req, res, next) => {
    res.locals.requestClosed = false;    

    req.on('aborted', () => {
        res.locals.requestClosed = true;        
    });

    const logResponseWhenRequestAborted = (body) => {
        if (!res.locals.requestClosed) return;        
        console.log(`Logging response: ${JSON.stringify(body)}`);
    }

    const refFunctionJson = res.json;
    res.json = (body) => {        
        refFunctionJson.call(res, body);
        logResponseWhenRequestAborted(body);
    }
    next();
};

module.exports = trackRequestAbort;
