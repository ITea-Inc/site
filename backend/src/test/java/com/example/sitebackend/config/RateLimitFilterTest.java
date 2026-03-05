package com.example.sitebackend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.PrintWriter;
import java.io.StringWriter;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RateLimitFilterTest {

    @Mock HttpServletRequest request;
    @Mock HttpServletResponse response;
    @Mock FilterChain filterChain;

    @InjectMocks
    RateLimitFilter rateLimitFilter;

    private void setupPostContactRequest() {
        when(request.getMethod()).thenReturn("POST");
        when(request.getRequestURI()).thenReturn("/api/contact");
        when(request.getHeader("X-Forwarded-For")).thenReturn(null);
        when(request.getRemoteAddr()).thenReturn("192.168.1.1");
    }

    @Test
    void doFilter_shouldPassRequest_whenUnderRateLimit() throws Exception {
        setupPostContactRequest();

        rateLimitFilter.doFilter(request, response, filterChain);

        verify(filterChain, times(1)).doFilter(request, response);
        verify(response, never()).setStatus(429);
    }

    @Test
    void doFilter_shouldBlock_whenRateLimitExceeded() throws Exception {
        setupPostContactRequest();
        when(response.getWriter()).thenReturn(new PrintWriter(new StringWriter()));

        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);

        verify(response, times(1)).setStatus(429);
        verify(filterChain, times(3)).doFilter(request, response);
    }

    @Test
    void doFilter_shouldNotFilter_whenGetRequest() throws Exception {

        when(request.getMethod()).thenReturn("GET");

        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);

        verify(filterChain, times(4)).doFilter(request, response);
        verify(response, never()).setStatus(429);
    }

    @Test
    void doFilter_shouldNotFilter_whenDifferentUri() throws Exception {

        when(request.getMethod()).thenReturn("POST");
        when(request.getRequestURI()).thenReturn("/api/other");

        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);
        rateLimitFilter.doFilter(request, response, filterChain);

        verify(filterChain, times(4)).doFilter(request, response);
        verify(response, never()).setStatus(429);
    }
}