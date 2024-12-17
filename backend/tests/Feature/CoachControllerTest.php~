<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CoachControllerTest extends TestCase
{
    // Test fetching all coaches
    public function test_fetch_all_coaches()
    {
        $response = $this->get('/api/coaches');
        $response->assertStatus(200);
        $this->assertCount(5, $response->json());
    }

    // Test filtering coaches by name
    public function test_filter_coaches_by_name()
    {
        $response = $this->get('/api/coaches?filter=john');
        $response->assertStatus(200);
        $this->assertCount(1, $response->json());
    }

    // Test filtering coaches by location
    public function test_filter_coaches_by_location()
    {
        $response = $this->get('/api/coaches?filter=giza');
        $response->assertStatus(200);
        $this->assertCount(2, $response->json());
    }

    // Test sorting coaches by rate in ascending order
    public function test_sort_coaches_by_rate_asc()
    {
        $response = $this->get('/api/coaches?sort=asc');
        $response->assertStatus(200);
        $this->assertEquals(15, $response->json()[0]['rate']);
    }

    // Test sorting coaches by rate in descending order
    public function test_sort_coaches_by_rate_desc()
    {
        $response = $this->get('/api/coaches?sort=desc');
        $response->assertStatus(200);
        $this->assertEquals(35, $response->json()[0]['rate']);
    }
}
