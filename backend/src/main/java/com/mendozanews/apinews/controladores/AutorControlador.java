package com.mendozanews.apinews.controladores;

import com.mendozanews.apinews.entidades.Autor;
import com.mendozanews.apinews.excepciones.MiException;
import com.mendozanews.apinews.servicios.AutorServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/autor")
public class AutorControlador {

    @Autowired
    private AutorServicio as;

    @GetMapping("/listar")
    public List<Autor> listaAutores() {
        try {
            List<Autor> autores = as.listarAutores();
            System.out.println("Lista autores: ");
            return autores;
        } catch (Exception e) {
            System.out.println("No lista autores: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/{id}")
    public Autor autor(@PathVariable("id") String id) {
        try {
            Autor autor = as.getOne(id);
            System.out.println("Autor: " + autor);
            return autor;
        } catch (Exception e) {
            System.out.println("No encuentra el autor: " + e.getMessage());
            return null;
        }
    }

    @PostMapping("/nuevo")
    public ResponseEntity<String> registrarAutor(@RequestParam String nombre, @RequestParam String apellido,
            @RequestParam MultipartFile foto) {
        try {
            System.out.println("Entra al try autor: ");
            as.crearAutor(nombre, apellido, foto);
            System.out.println("Sube autor: ");
            return ResponseEntity.ok("Exito al guardar el autor");
        } catch (MiException ex) {
            System.out.println("No sube autor: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar el autor: " + ex.getMessage());
        }
    }

    @PostMapping("/editar/{id}")
    public ResponseEntity<String> editarAutor(@PathVariable("id") String id, @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam MultipartFile foto) {
        try {
            as.modificarAutor(id, nombre, apellido, foto);
            return ResponseEntity.ok("Exito al guardar el autor");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar el autor: " + ex.getMessage());
        }
    }

    @PostMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") String id) throws MiException {
        try {
            as.eliminarAutorId(id);
            return ResponseEntity.ok("Exito al eliminar el autor");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el autor: " + ex.getMessage());
        }
    }

}
