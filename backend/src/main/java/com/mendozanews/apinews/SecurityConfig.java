package com.mendozanews.apinews;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.mendozanews.apinews.servicios.UsuarioServicio;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UsuarioServicio usuarioServicio;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults()).csrf(csrf -> csrf.disable())
                .authorizeRequests(requests -> requests
                        .antMatchers("/api/usuario/login").permitAll()
                        .anyRequest().authenticated()
                        .and()
                        .formLogin()
                        .loginProcessingUrl("/api/usuario/login")
                        .usernameParameter("nombre") // Parameter name for username in login form
                        .passwordParameter("password") // Parameter name for password in login form
                        .and()
                        .logout()
                        .logoutUrl("/api/usuario/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}