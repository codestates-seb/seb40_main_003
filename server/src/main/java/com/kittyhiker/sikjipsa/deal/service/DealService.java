package com.kittyhiker.sikjipsa.deal.service;

import com.kittyhiker.sikjipsa.deal.respository.DealRepository;
import com.kittyhiker.sikjipsa.deal.respository.DealReviewRepository;
import com.kittyhiker.sikjipsa.deal.respository.LikeDealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DealService {

    private DealRepository dealRepository;
    private DealReviewRepository reviewRepository;
    private LikeDealRepository likeDealRepository;


}
