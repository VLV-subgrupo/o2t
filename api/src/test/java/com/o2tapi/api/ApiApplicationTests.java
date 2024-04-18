package com.o2tapi.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class ApiApplicationTests {

	@Autowired
    private MockMvc mockMvc;

    /**
     * Tests if the Spring context loads properly indicating all necessary components are correctly configured.
     */
	@Test
	void contextLoads() {
	}

    /**
     * Verifies that the '/hello' endpoint returns the correct message.
     * This test ensures that the endpoint not only responds with a status code of 200 (OK),
     * but also confirms that the response body contains the expected text.
     *
     * @throws Exception if the perform method fails
     */
	@Test
    void testHelloEndpoint() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/hello"))
               .andExpect(MockMvcResultMatchers.status().isOk())
               .andExpect(MockMvcResultMatchers.content().string("Hello, O2t Backend!"));
    }

    /**
     * Tests the '/hello-error' endpoint to ensure it handles errors as expected by returning an internal server error.
     * This test checks if the application correctly identifies and handles the thrown exception by returning
     * a 500 Internal Server Error status.
     *
     * @throws Exception if the perform method fails
     */
    @Test
    void testHelloEndpointErrorScenario() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/hello-error"))
               .andExpect(MockMvcResultMatchers.status().isInternalServerError());
    }
}
