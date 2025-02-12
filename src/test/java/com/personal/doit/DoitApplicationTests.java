package com.personal.doit;

import com.personal.doit.entity.User;
import com.personal.doit.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DoitApplicationTests {
	@Autowired
	private UserRepository userRepository;


	// 세팅후 간단한 테스트
	@Test
	void jpaTest(){
		User user = User.builder()
				.userId("jdj881204")
				.password("1234")
				.nickname("닉네임")
				.build();

		userRepository.save(user);

	}
}
