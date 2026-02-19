import { useState, useEffect } from 'react';

export interface QuestionReview {
  questionId: number;
  chapterId: number;
  lastReviewDate: number;
  reviewCount: number;
  isCorrect: boolean;
  nextReviewDate: number;
  easeFactor: number; // SM-2 algorithm ease factor
  interval: number; // Days until next review
}

const STORAGE_KEY = 'science_mcq_spaced_repetition';

// SM-2 Algorithm implementation
const calculateNextReview = (
  easeFactor: number,
  interval: number,
  isCorrect: boolean
): { newEaseFactor: number; newInterval: number; nextDate: number } => {
  let newEaseFactor = easeFactor;
  let newInterval = interval;

  if (isCorrect) {
    if (interval === 0) {
      newInterval = 1;
    } else if (interval === 1) {
      newInterval = 3;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newEaseFactor = Math.max(1.3, easeFactor + 0.1);
  } else {
    newInterval = 1;
    newEaseFactor = Math.max(1.3, easeFactor - 0.2);
  }

  const nextDate = Date.now() + newInterval * 24 * 60 * 60 * 1000;
  return { newEaseFactor, newInterval, nextDate };
};

export const useSpacedRepetition = () => {
  const [reviews, setReviews] = useState<Map<string, QuestionReview>>(new Map());

  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setReviews(new Map(Object.entries(data)));
      } catch (e) {
        console.error('Failed to load spaced repetition data:', e);
      }
    }
  }, []);

  // Save reviews to localStorage
  const saveReviews = (newReviews: Map<string, QuestionReview>) => {
    const obj = Object.fromEntries(newReviews);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    setReviews(newReviews);
  };

  const recordReview = (
    questionId: number,
    chapterId: number,
    isCorrect: boolean
  ) => {
    const key = `${chapterId}_${questionId}`;
    const existing = reviews.get(key) || {
      questionId,
      chapterId,
      lastReviewDate: 0,
      reviewCount: 0,
      isCorrect: false,
      nextReviewDate: 0,
      easeFactor: 2.5,
      interval: 0,
    };

    const { newEaseFactor, newInterval, nextDate } = calculateNextReview(
      existing.easeFactor,
      existing.interval,
      isCorrect
    );

    const updated: QuestionReview = {
      ...existing,
      lastReviewDate: Date.now(),
      reviewCount: existing.reviewCount + 1,
      isCorrect,
      nextReviewDate: nextDate,
      easeFactor: newEaseFactor,
      interval: newInterval,
    };

    const newReviews = new Map(reviews);
    newReviews.set(key, updated);
    saveReviews(newReviews);
  };

  const getQuestionsForReview = (chapterId: number): number[] => {
    const now = Date.now();
    const questionsToReview: number[] = [];

    reviews.forEach((review) => {
      if (
        review.chapterId === chapterId &&
        review.nextReviewDate <= now
      ) {
        questionsToReview.push(review.questionId);
      }
    });

    return questionsToReview;
  };

  const getReviewStats = (chapterId: number) => {
    let totalReviews = 0;
    let correctReviews = 0;
    let questionsForReview = 0;

    reviews.forEach((review) => {
      if (review.chapterId === chapterId) {
        totalReviews += review.reviewCount;
        if (review.isCorrect) correctReviews += review.reviewCount;
        if (review.nextReviewDate <= Date.now()) questionsForReview++;
      }
    });

    return {
      totalReviews,
      correctReviews,
      accuracy: totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0,
      questionsForReview,
    };
  };

  return {
    recordReview,
    getQuestionsForReview,
    getReviewStats,
  };
};
