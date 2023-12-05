package com.mendozanews.apinews.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MiException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public MiException(String msj) {
        super(msj);
    }
}

