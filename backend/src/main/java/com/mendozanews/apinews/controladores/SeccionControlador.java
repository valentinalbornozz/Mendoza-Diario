package com.mendozanews.apinews.controladores;

import com.mendozanews.apinews.entidades.Seccion;
import com.mendozanews.apinews.excepciones.MiException;
import com.mendozanews.apinews.servicios.SeccionServicio;

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
@RequestMapping("/api/seccion")
public class SeccionControlador {

    @Autowired
    private SeccionServicio ss;

    @GetMapping("/listar")
    public List<Seccion> listaSecciones() {
        try {
            List<Seccion> secciones = ss.listarSecciones();
            System.out.println("Listas enviada con exito");
            return secciones;
        } catch (Exception e) {
            System.out.println("No pude listar secciones: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/{id}")
    public Seccion seccion(@PathVariable("id") String id) {
        try {
            Seccion seccion = ss.getOne(id);
            System.out.println("Seccion: " + seccion);
            return seccion;
        } catch (Exception e) {
            System.out.println("No encuentra la sección: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/codigo/{codigo}")
    public Seccion seccionPorCodigo(@PathVariable("codigo") String codigo) {
        try {
            Seccion seccion = ss.buscarPorCodigo(codigo);
            System.out.println("Seccion: " + seccion);
            return seccion;
        } catch (Exception e) {
            System.out.println("No encuantra la sección: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/nombre/{nombre}")
    public Seccion seccionPorNombre(@PathVariable("nombre") String nombre) {
        try {
            Seccion seccion = ss.buscarPorNombre(nombre);
            System.out.println("Seccion: " + seccion);
            return seccion;
        } catch (Exception e) {
            System.out.println("No encuantra la sección: " + e.getMessage());
            return null;
        }
    }

    @PostMapping("/nueva")
    public ResponseEntity<String> registrar(@RequestParam String codigo, @RequestParam String nombre,
            @RequestParam MultipartFile icono) {
        try {
            ss.crearSeccion(codigo, nombre, icono);
            return ResponseEntity.ok("Exito al crear la sección");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear la sección: " + ex.getMessage());
        }
    }

    @PostMapping("/editar/{id}")
    public ResponseEntity<String> modificar(@PathVariable String id, @RequestParam String codigo,
            @RequestParam String nombre,
            @RequestParam MultipartFile icono) {
        try {
            ss.modificarSeccion(id, codigo, nombre, icono);
            return ResponseEntity.ok("Exito al editar la sección");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al editar la sección: " + ex.getMessage());
        }
    }

    @PostMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") String id) throws MiException {
        try {
            ss.eliminarSeccionId(id);
            return ResponseEntity.ok("Exito al eliminar la sección");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la seccion: " + ex.getMessage());
        }
    }
}
