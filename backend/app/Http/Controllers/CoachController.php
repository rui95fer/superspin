<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CoachController extends Controller
{
    // Array of coaches
    private array $coaches = [
        ['name' => 'Michael Johnson', 'experience' => 5, 'rate' => 20, 'location' => 'New York, USA', 'joined' => '01/01/2021'],
        ['name' => 'Sophia Williams', 'experience' => 10, 'rate' => 30, 'location' => 'London, UK', 'joined' => '15/05/2020'],
        ['name' => 'Liam Smith', 'experience' => 7, 'rate' => 25, 'location' => 'Dublin, Ireland', 'joined' => '10/03/2022'],
        ['name' => 'Isabella Martinez', 'experience' => 3, 'rate' => 15, 'location' => 'Madrid, Spain', 'joined' => '20/09/2019'],
        ['name' => 'Aiden Lee', 'experience' => 9, 'rate' => 35, 'location' => 'Toronto, Canada', 'joined' => '05/07/2024'],
];

    // Handles the index request for coaches
    public function index(Request $request): JsonResponse
    {
        // Initialize data with the coaches array
        $data = $this->coaches;

        // Check if a filter is provided in the request
        if ($request->has('filter')) {
            // Get the filter value from the request query
            $filter = strtolower($request->query('filter'));

            // Filter the coaches based on the filter value
            $data = array_filter($data, function ($coach) use ($filter) {
                return str_contains(strtolower($coach['name']), $filter) || str_contains(strtolower($coach['location']), $filter);
            });
        }

        // Check if a sort is provided in the request
        if ($request->has('sort')) {
            // Get the sort value from the request query
            $sort = $request->query('sort');

            // Sort the coaches based on the sort value
            usort($data, function ($a, $b) use ($sort) {
                return $sort === 'asc' ? $a['rate'] - $b['rate'] : $b['rate'] - $a['rate'];
            });
        }

        // Return the filtered and sorted data as a JSON response
        return new JsonResponse(array_values($data));
    }
}
