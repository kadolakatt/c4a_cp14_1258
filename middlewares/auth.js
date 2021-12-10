const { verify } = require('jsonwebtoken');

const authGuard = (_request, _response, next) => {
    const authorization = _request.headers.authorization;
    if (!authorization) {
        _response.status(401).send("Usted no tiene permisos para acceder a esta acción.");
    }else {
        try {
            console.log("Validando petición. ");
            const token = authorization.split(' ')[1];
            const datosToken = verify(token, process.env.JWT_ACCESS_SECRET);
            _request.jwtData = datosToken;
            return next();
        }catch (e) {
            console.log(e);
            _response.status(401).send("Usted no tiene permisos para acceder a esta acción.");
        }
    }
}

exports.authGuard = authGuard;