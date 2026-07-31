import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { applications, jobs } from "../../../../db/schema";
import { requireApiAdmin } from "../../../lib/server-auth";

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export async function GET() {
  const auth = await requireApiAdmin();
  if (auth.response) return auth.response;

  const rows = await getDb()
    .select({
      id: applications.id,
      candidateName: applications.candidateName,
      email: applications.userEmail,
      phone: applications.phone,
      jobTitle: jobs.title,
      currentCompany: applications.currentCompany,
      currentSalary: applications.currentSalary,
      expectedSalary: applications.expectedSalary,
      jobLevel: applications.jobLevel,
      promotionStatus: applications.promotionStatus,
      performancePay: applications.performancePay,
      status: applications.status,
      consultantNotes: applications.consultantNotes,
      createdAt: applications.createdAt,
    })
    .from(applications)
    .innerJoin(jobs, eq(applications.jobId, jobs.id))
    .orderBy(desc(applications.createdAt));

  const headers = [
    "ID",
    "候选人",
    "邮箱",
    "电话",
    "岗位",
    "当前公司",
    "当前薪资",
    "期望薪资",
    "职级",
    "晋升情况",
    "绩效薪资",
    "流程状态",
    "顾问备注",
    "提交时间",
  ];
  const lines = [
    headers.map(csvCell).join(","),
    ...rows.map((row) => Object.values(row).map(csvCell).join(",")),
  ];

  return new Response(`\uFEFF${lines.join("\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="shiguang-applications-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
