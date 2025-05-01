DELETE from usuarios;
INSERT INTO usuarios (nome,email,senha)
SELECT 'Glauco Leal','glauco.leal.ter@estacio.br','$2b$12$Wh/sgyuhro5ofqy2.5znc.vJLbnVYPJxHk91WuC3uCFovQzzMt9Ju' UNION
SELECT 'Rodrigo Herman','rodrigo.herman@yduqs.com.br','$2b$12$Wh/sgyuhro5ofqy2.5znc.vJLbnVYPJxHk91WuC3uCFovQzzMt9Ju' UNION
SELECT 'Thiago Abreu','thiago.abreu@yduqs.com.br','$2b$12$Wh/sgyuhro5ofqy2.5znc.vJLbnVYPJxHk91WuC3uCFovQzzMt9Ju';
